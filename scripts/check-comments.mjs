import { globSync } from "node:fs"
import { readFileSync } from "node:fs"
import { join } from "node:path"

const patterns = ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "features/**/*.{ts,tsx}", "lib/**/*.{ts,tsx}", "mocks/**/*.{ts,tsx}"]
const files = globSync(patterns, { ignore: ["components/ui/**", "node_modules/**"] })

let hasError = false
const commentRegex = /^\s*(\/\/|\/\*|\*\s|\{\/\*)/

for (const file of files) {
  const content = readFileSync(file, "utf-8")
  const lines = content.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.match(commentRegex) && !line.includes("use client") && !line.includes("use server") && !line.includes("eslint-disable")) {
      console.error(`${file}:${i + 1}: Found comment: ${line.trim()}`)
      hasError = true
    }
  }
}

if (hasError) {
  console.error("Comments found in source code. Please remove them.")
  process.exit(1)
} else {
  console.log("No comments found.")
}
