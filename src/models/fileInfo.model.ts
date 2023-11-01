export interface FileInfo {
  name: string;
  url: string;
}

export function validateFileInfo(fileInfo: FileInfo): void {
  if (!fileInfo.name) {
    throw new Error("The name property is required.");
  }

  if (!fileInfo.url) {
    throw new Error("The url property is required.");
  }
}
