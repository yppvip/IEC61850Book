param([int]$Start=1,[int]$End=113,[string]$ImagePath='',[string]$OutputPath='')
# Windows PowerShell 5.1 / local Windows OCR. Scans and recognition stay local.
$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.Runtime.WindowsRuntime
$null=[Windows.Storage.StorageFile,Windows.Storage,ContentType=WindowsRuntime]
$null=[Windows.Graphics.Imaging.BitmapDecoder,Windows.Graphics.Imaging,ContentType=WindowsRuntime]
$null=[Windows.Media.Ocr.OcrEngine,Windows.Foundation,ContentType=WindowsRuntime]
$null=[Windows.Globalization.Language,Windows.Globalization,ContentType=WindowsRuntime]
$asTask=([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.IsGenericMethod -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' })[0]
function Await($op,$type){ $task=$asTask.MakeGenericMethod($type).Invoke($null,@($op));$task.Wait();$task.Result }
$engine=[Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage([Windows.Globalization.Language]::new('zh-Hans-CN'))
$dir=Join-Path (Split-Path $PSScriptRoot -Parent) 'tmp\part74-ocr'
for($i=$Start;$i -le $End;$i++){
 $target=Join-Path $dir ('page-{0:D3}.json' -f $i)
 if($OutputPath){$target=$OutputPath}
 if(Test-Path -LiteralPath $target){continue}
 $image=Join-Path $dir ('page-{0:D3}.png' -f $i)
 if($ImagePath){$image=$ImagePath}
 $file=Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync($image)) ([Windows.Storage.StorageFile])
 $stream=Await ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
 $decoder=Await ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
 $bitmap=Await ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
 $result=Await ($engine.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult])
 $lines=@($result.Lines | ForEach-Object { @{text=$_.Text;words=@($_.Words | ForEach-Object {@{text=$_.Text;x=$_.BoundingRect.X;y=$_.BoundingRect.Y;width=$_.BoundingRect.Width;height=$_.BoundingRect.Height}})} })
 @{page=$i;text=$result.Text;lines=$lines} | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $target -Encoding UTF8
 $bitmap.Dispose();$stream.Dispose()
 Write-Output ('OCR page '+$i)
}
