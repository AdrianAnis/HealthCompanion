import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"

const ROOTS = ["app", "components", "features", "lib", "mocks"]
const EXTENSIONS = [".ts", ".tsx"]
const IGNORED_DIRECTORIES = ["components/ui"]
const COMMENT_PATTERN = /^\s*(\/\/|\/\*|\*\s|\{\/\*)/
const ALLOWED_DIRECTIVES = ["use client", "use server"]

function listSourceFiles(directory) {
  return readdirSync(directory, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && EXTENSIONS.some((extension) => entry.name.endsWith(extension)))
    .map((entry) => join(entry.parentPath, entry.name).replaceAll("\\", "/"))
    .filter((file) => !IGNORED_DIRECTORIES.some((ignored) => file.startsWith(`${ignored}/`)))
}

function findCommentLines(file) {
  return readFileSync(file, "utf-8")
    .split("\n")
    .map((line, index) => ({ file, lineNumber: index + 1, text: line.trim() }))
    .filter(({ text }) => COMMENT_PATTERN.test(text) && !ALLOWED_DIRECTIVES.some((directive) => text.includes(directive)))
}

const violations = ROOTS.flatMap(listSourceFiles).flatMap(findCommentLines)

if (violations.length > 0) {
  violations.forEach(({ file, lineNumber, text }) => console.error(`${file}:${lineNumber}: ${text}`))
  console.error(`${violations.length} comment line(s) found.`)
  process.exit(1)
}

console.log("No comments found.")
