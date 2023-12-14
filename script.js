class FileSystem {
    constructor() {
      this.root = {
        type: 'dir',
        name: '/',
        contents: {},
        parent: null,
      };
      this.currentDir = this.root;
    }
  
    // Helper function to parse paths
    parsePath(path) {
      const parts = path.split('/').filter(part => part !== '');
      return parts;
    }
  
    // Helper function to get the directory based on a path
    getDirectory(path) {
      const parts = this.parsePath(path);
      let currentDir = this.currentDir;
  
      for (const part of parts) {
        if (part === '..') {
          currentDir = currentDir.parent || currentDir;
        } else if (part === '~') {
          currentDir = this.root;
        } else {
          currentDir = currentDir.contents[part];
        }
  
        if (!currentDir || currentDir.type !== 'dir') {
          return null; // Directory not found
        }
      }
  
      return currentDir;
    }
  
    // 1. mkdir: Create a new directory
    mkdir(name) {
      const newDir = {
        type: 'dir',
        name: name,
        contents: {},
        parent: this.currentDir,
      };
  
      this.currentDir.contents[name] = newDir;
    }
  
    // 2. ls: List the contents of the current directory or a specified directory
    ls(path = '.') {
      const directory = this.getDirectory(path) || this.currentDir;
      const contents = Object.keys(directory.contents);
      return contents.join(' ');
    }
  
    // 3. cat: Display the contents of a file
    cat(path) {
      const file = this.getDirectory(path);
      if (file && file.type === 'file') {
        return file.contents || '';
      }
      return 'File not found';
    }
  
    // 4. touch: Create a new empty file
    touch(name) {
      const newFile = {
        type: 'file',
        name: name,
        contents: '',
        parent: this.currentDir,
      };
  
      this.currentDir.contents[name] = newFile;
    }
  
    // 5. echo: Write text to a file
    echo(path, text) {
      const file = this.getDirectory(path);
      if (file && file.type === 'file') {
        file.contents = text;
      } else {
        return 'File not found';
      }
    }
  
    // 6. mv: Move a file or directory to another location
    mv(sourcePath, destinationPath) {
      const source = this.getDirectory(sourcePath);
      const destinationDir = this.getDirectory(destinationPath);
  
      if (source && destinationDir && destinationDir.type === 'dir') {
        delete source.parent.contents[source.name];
        source.parent = destinationDir;
        destinationDir.contents[source.name] = source;
      } else {
        return 'Invalid source or destination';
      }
    }
  
    // 7. cp: Copy a file or directory to another location
    cp(sourcePath, destinationPath) {
      const source = this.getDirectory(sourcePath);
      const destinationDir = this.getDirectory(destinationPath);
  
      if (source && destinationDir && destinationDir.type === 'dir') {
        const copy = JSON.parse(JSON.stringify(source));
        copy.parent = destinationDir;
        destinationDir.contents[copy.name] = copy;
      } else {
        return 'Invalid source or destination';
      }
    }
  
    // 8. rm: Remove a file or directory
    rm(path) {
      const target = this.getDirectory(path);
  
      if (target && target !== this.root) {
        delete target.parent.contents[target.name];
      } else {
        return 'Invalid target';
      }
    }
  }
  
  // Example usage
  const fileSystem = new FileSystem();
  
  fileSystem.mkdir('documents');
  fileSystem.touch('file1.txt');
  fileSystem.echo('file1.txt', 'Hello, World!');
  console.log(fileSystem.cat('file1.txt')); // Outputs: Hello, World!
  
  fileSystem.cd('documents');
  fileSystem.touch('file2.txt');
  fileSystem.echo('file2.txt', 'This is a new file.');
  console.log(fileSystem.ls()); // Outputs: file2.txt
  fileSystem.cd('..');
  
  fileSystem.mkdir('downloads');
  fileSystem.cp('documents/file2.txt', 'downloads/file2_copy.txt');
  console.log(fileSystem.ls('downloads')); // Outputs: file2_copy.txt
  
  fileSystem.rm('documents/file2.txt');
  console.log(fileSystem.ls('documents')); // Outputs: (empty)
  