declare module 'react-native-html-to-pdf' {
  interface Options {
    html: string;
    fileName: string;
    directory: string;
  }
  
  export default {
    convert(options: Options): Promise<{ filePath: string }>;
  };
} 