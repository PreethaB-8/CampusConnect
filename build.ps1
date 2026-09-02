# CampusConnect local build script

$artifact = "campusconnect.zip"

if (Test-Path $artifact) {
    Remove-Item $artifact -Force
}

Compress-Archive `
    -Path "src", "package.json", "package-lock.json" `
    -DestinationPath $artifact `
    -Force

if (Test-Path $artifact) {
    Write-Host "BUILD SUCCESSFUL"
    Write-Host "Artifact created: $artifact"
} else {
    Write-Error "BUILD FAILED: Artifact was not created."
    exit 1
}