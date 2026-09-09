Add-Type -AssemblyName System.Drawing

$brandDir = Join-Path $PSScriptRoot '..\assets\brand'
New-Item -ItemType Directory -Path $brandDir -Force | Out-Null

function New-BrandBitmap {
  param(
    [string]$Path,
    [int]$Width,
    [int]$Height,
    [bool]$Transparent,
    [string]$Title,
    [int]$FontSize
  )

  $bitmap = New-Object System.Drawing.Bitmap($Width, $Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  if ($Transparent) { $graphics.Clear([System.Drawing.Color]::Transparent) } else { $graphics.Clear([System.Drawing.ColorTranslator]::FromHtml('#F36F21')) }

  $font = New-Object System.Drawing.Font('Arial', $FontSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
  $format = New-Object System.Drawing.StringFormat
  $format.Alignment = [System.Drawing.StringAlignment]::Center
  $format.LineAlignment = [System.Drawing.StringAlignment]::Center
  $bounds = New-Object System.Drawing.RectangleF(0, 0, $Width, $Height)
  $graphics.DrawString($Title, $font, $brush, $bounds, $format)
  $bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)

  $format.Dispose()
  $brush.Dispose()
  $font.Dispose()
  $graphics.Dispose()
  $bitmap.Dispose()
}

New-BrandBitmap -Path (Join-Path $brandDir 'icon-placeholder.png') -Width 1024 -Height 1024 -Transparent $false -Title 'G' -FontSize 520
New-BrandBitmap -Path (Join-Path $brandDir 'adaptive-icon-placeholder.png') -Width 1024 -Height 1024 -Transparent $true -Title 'G' -FontSize 430
New-BrandBitmap -Path (Join-Path $brandDir 'splash-placeholder.png') -Width 900 -Height 300 -Transparent $true -Title 'GIVOVA' -FontSize 160
New-BrandBitmap -Path (Join-Path $brandDir 'favicon-placeholder.png') -Width 64 -Height 64 -Transparent $false -Title 'G' -FontSize 38

Write-Output "Placeholder assets generated in $brandDir"
