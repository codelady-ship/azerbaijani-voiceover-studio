# Builds the Agensi upload package: dist/azerbaijani-voiceover-studio.zip
# Contents: one top-level folder azerbaijani-voiceover-studio/ with SKILL.md, templates/, examples/, CHANGELOG.md only.
# Usage (from anywhere): pwsh ./scripts/build-agensi-zip.ps1

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$root    = Split-Path -Parent $PSScriptRoot
$name    = 'azerbaijani-voiceover-studio'
$distDir = Join-Path $root 'dist'
$zipPath = Join-Path $distDir "$name.zip"
$include = @('SKILL.md', 'templates', 'examples', 'CHANGELOG.md')

New-Item -ItemType Directory -Force -Path $distDir | Out-Null
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }

$zip = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)
try {
    foreach ($item in $include) {
        $src = Join-Path $root $item
        if (-not (Test-Path $src)) { throw "Missing required item: $item" }
        $files = if ((Get-Item $src).PSIsContainer) { Get-ChildItem -Path $src -Recurse -File } else { @(Get-Item $src) }
        foreach ($f in $files) {
            $rel   = $f.FullName.Substring($root.Length).TrimStart('\', '/').Replace('\', '/')
            $entry = "$name/$rel"
            [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $f.FullName, $entry, [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null
        }
    }
}
finally {
    $zip.Dispose()
}

$check = [System.IO.Compression.ZipFile]::OpenRead($zipPath)
try {
    Write-Host "Built $zipPath"
    $check.Entries | ForEach-Object { Write-Host ("  {0}  ({1} bytes)" -f $_.FullName, $_.Length) }
}
finally {
    $check.Dispose()
}
