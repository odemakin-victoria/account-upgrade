export class FileHandler {
    static getFileExtension(filename?: string): string {
       
        if (!filename || filename.trim() === '') {
          return '';
        }
    
        const dotIndex = filename.lastIndexOf('.');
        if (dotIndex === -1 || dotIndex === 0 || dotIndex === filename.length - 1) {
          return '';
        }
    
        const extension = filename.substring(dotIndex + 1);
        const queryParamIndex = extension.indexOf('?');
        if (queryParamIndex !== -1) {
          return extension.substring(0, queryParamIndex).toLowerCase();
        }
    
        return extension.toLowerCase();
      }
}
