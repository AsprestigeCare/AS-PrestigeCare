# Script d'initialisation de la base PostgreSQL pour AS Prestige Care
# Usage : pwsh -File .\scripts\init-db.ps1

param()

# Recherche de psql
$psqlCmd = Get-Command psql -ErrorAction SilentlyContinue
if (-not $psqlCmd) {
    $psqlPath = Read-Host "psql introuvable dans le PATH. Indiquez le chemin complet de psql.exe"
} else {
    $psqlPath = $psqlCmd.Source
}

# Demande du mot de passe pour l'utilisateur aspc
$securePwd = Read-Host "Mot de passe pour l'utilisateur 'aspc'" -AsSecureString
$pwdPtr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePwd)
$plainPwd = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pwdPtr)
[Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pwdPtr)

# Lecture du SQL et substitution du mot de passe
$sqlPath = Join-Path $PSScriptRoot '..\db\init.sql'
$sqlTemplate = Get-Content -Raw -Path $sqlPath
$sql = $sqlTemplate.Replace('<PG_PASSWORD>', $plainPwd)
$plainPwd = $null

# Exécution via psql
$psi = New-Object System.Diagnostics.ProcessStartInfo
$psi.FileName = $psqlPath
$psi.Arguments = '-U postgres -f -'
$psi.RedirectStandardInput = $true
$psi.RedirectStandardOutput = $true
$psi.RedirectStandardError = $true
$psi.UseShellExecute = $false

$proc = New-Object System.Diagnostics.Process
$proc.StartInfo = $psi
$proc.Start() | Out-Null
$proc.StandardInput.Write($sql)
$proc.StandardInput.Close()
$stdout = $proc.StandardOutput.ReadToEnd()
$stderr = $proc.StandardError.ReadToEnd()
$proc.WaitForExit()

if ($proc.ExitCode -ne 0) {
    Write-Host $stderr -ForegroundColor Red
    Write-Host "Erreur lors de l'initialisation de la base (code $($proc.ExitCode))." -ForegroundColor Red
    exit $proc.ExitCode
} else {
    Write-Host $stdout
    Write-Host '✅DB prête'
}

