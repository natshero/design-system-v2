import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const categoriesDir = path.join(
  rootDir,
  "docs",
  "src",
  "pages",
  "preview-sections",
  "Components",
  "categories",
);

const categoryFiles = [
  "InputsRenderer.tsx",
  "DisplayRenderer.tsx",
  "FeedbackRenderer.tsx",
  "NavigationRenderer.tsx",
  "OverlayRenderer.tsx",
  "LayoutRenderer.tsx",
  "PatternsShowcaseRenderer.tsx",
];

const stateDeclarations = [
  {
    identifiers: ["checked", "setChecked"],
    pattern: /^\s*const \[checked, setChecked\] = useState\(false\)\r?\n?/m,
  },
  {
    identifiers: ["toggled", "setToggled"],
    pattern: /^\s*const \[toggled, setToggled\] = useState\(false\)\r?\n?/m,
  },
  {
    identifiers: ["sliderVal", "setSliderVal"],
    pattern: /^\s*const \[sliderVal, setSliderVal\] = useState\(\[50\]\)\r?\n?/m,
  },
  {
    identifiers: ["commandOpen", "setCommandOpen"],
    pattern: /^\s*const \[commandOpen, setCommandOpen\] = useState\(false\)\r?\n?/m,
  },
];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isIdentifierUsed(content, identifier) {
  const matcher = new RegExp(`\\b${escapeRegExp(identifier)}\\b`, "m");
  return matcher.test(content);
}

function collectImportDeclarations(sourceText, filePath) {
  const sourceFile = ts.createSourceFile(
    filePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );

  const imports = sourceFile.statements.filter(ts.isImportDeclaration).map((statement) => {
    const clause = statement.importClause;
    return {
      isTypeOnly: clause?.isTypeOnly ?? false,
      moduleSpecifier: statement.moduleSpecifier.text,
      defaultImport: clause?.name?.text ?? null,
      namespaceImport:
        clause?.namedBindings && ts.isNamespaceImport(clause.namedBindings)
          ? clause.namedBindings.name.text
          : null,
      namedImports:
        clause?.namedBindings && ts.isNamedImports(clause.namedBindings)
          ? clause.namedBindings.elements.map((element) => ({
              importedName: element.propertyName?.text ?? element.name.text,
              localName: element.name.text,
              isTypeOnly: element.isTypeOnly,
            }))
          : [],
    };
  });

  const lastImport = sourceFile.statements
    .filter(ts.isImportDeclaration)
    .at(-1);

  if (!lastImport) {
    throw new Error(`No import declarations found in ${filePath}`);
  }

  return {
    imports,
    body: sourceText.slice(lastImport.end).trimStart(),
  };
}

function pruneDateRangeHelper(content) {
  const dateRangeStart = content.indexOf("function DateRangePickerSection");
  const interfaceStart = content.indexOf("interface ComponentCategoryRendererProps");

  if (dateRangeStart === -1 || interfaceStart === -1) {
    return content;
  }

  const afterHelper = content.slice(interfaceStart);
  if (afterHelper.includes("DateRangePickerSection")) {
    return content;
  }

  return `${content.slice(0, dateRangeStart).trimEnd()}\n\n${content.slice(interfaceStart).trimStart()}`;
}

function pruneStateDeclarations(content) {
  let nextContent = content;

  for (const stateDeclaration of stateDeclarations) {
    const candidate = nextContent.replace(stateDeclaration.pattern, "");
    const isStillUsed = stateDeclaration.identifiers.some((identifier) =>
      isIdentifierUsed(candidate, identifier),
    );

    if (!isStillUsed) {
      nextContent = candidate;
    }
  }

  return nextContent;
}

function buildImports(imports, body) {
  return imports
    .map((declaration) => {
      const parts = [];

      if (
        declaration.defaultImport &&
        isIdentifierUsed(body, declaration.defaultImport)
      ) {
        parts.push(declaration.defaultImport);
      }

      if (
        declaration.namespaceImport &&
        isIdentifierUsed(body, declaration.namespaceImport)
      ) {
        parts.push(`* as ${declaration.namespaceImport}`);
      }

      const usedNamedImports = declaration.namedImports.filter((namedImport) =>
        isIdentifierUsed(body, namedImport.localName),
      );

      const regularImports = usedNamedImports
        .filter((namedImport) => !namedImport.isTypeOnly)
        .map((namedImport) =>
          namedImport.importedName === namedImport.localName
            ? namedImport.localName
            : `${namedImport.importedName} as ${namedImport.localName}`,
        );

      const typeImports = usedNamedImports
        .filter((namedImport) => namedImport.isTypeOnly)
        .map((namedImport) =>
          namedImport.importedName === namedImport.localName
            ? namedImport.localName
            : `${namedImport.importedName} as ${namedImport.localName}`,
        );

      if (regularImports.length > 0) {
        parts.push(`{ ${regularImports.join(", ")} }`);
      }

      if (typeImports.length > 0) {
        parts.push(`{ type ${typeImports.join(", ")} }`);
      }

      if (parts.length === 0) {
        return null;
      }

      const importKeyword = declaration.isTypeOnly ? "import type" : "import";
      return `${importKeyword} ${parts.join(", ")} from '${declaration.moduleSpecifier}'`;
    })
    .filter(Boolean)
    .join("\n");
}

for (const fileName of categoryFiles) {
  const filePath = path.join(categoriesDir, fileName);
  const sourceText = await readFile(filePath, "utf8");
  const { imports, body } = collectImportDeclarations(sourceText, filePath);

  let nextBody = pruneDateRangeHelper(body);
  nextBody = pruneStateDeclarations(nextBody).trimStart();

  const nextImports = buildImports(imports, nextBody);
  const nextContent = `${nextImports}\n\n${nextBody}\n`;

  await writeFile(filePath, nextContent, "utf8");
}
