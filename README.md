# In-Memory File System

This project implements a simple in-memory file system in JavaScript. It provides basic file system operations through a command-line interface in an HTML environment.

## Usage

1. Open the `index.html` file in a web browser.

2. The page will display a console where you can enter commands to interact with the in-memory file system.

3. Supported commands:

   - `mkdir [directory_name]`: Create a new directory.
   - `ls [directory_path]`: List the contents of the current or specified directory.
   - `cat [file_path]`: Display the contents of a file.
   - `touch [file_name]`: Create a new empty file.
   - `echo [file_path] [text]`: Write text to a file.
   - `mv [source_path] [destination_path]`: Move a file or directory to another location.
   - `cp [source_path] [destination_path]`: Copy a file or directory to another location.
   - `rm [target_path]`: Remove a file or directory.

## Example

```bash
mkdir documents
ls
touch documents/file1.txt
echo documents/file1.txt "Hello, World!"
ls documents
cat documents/file1.txt
