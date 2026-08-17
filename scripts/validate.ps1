$ErrorActionPreference = 'Stop'

Write-Host '==> Validando backend...' -ForegroundColor Cyan
& dotnet test backend/FlowUp.Workshops.sln --nologo
if ($LASTEXITCODE -ne 0) { throw 'Falha na validação do backend.' }

Write-Host ''
Write-Host '==> Validando frontend...' -ForegroundColor Cyan
Set-Location frontend
& npm test -- --run
if ($LASTEXITCODE -ne 0) { throw 'Falha na validação dos testes do frontend.' }

& npm run build
if ($LASTEXITCODE -ne 0) { throw 'Falha no build do frontend.' }

Write-Host ''
Write-Host 'Validação concluída com sucesso.' -ForegroundColor Green
