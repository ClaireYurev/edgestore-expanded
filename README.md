# EdgeStore-Expanded
EdgeStore Client with expanded functionality: keep track of URLs, File Count, and Sizes.

## Changes
- Changed target: project has to target es2015, change applied*
- Changed /src/app/page.tsx                                (New everything)
- Changed /src/app/from/page.tsx                           (New everything)
- Changed /src/app/api/edgestore/[...edgestore]/route.ts   (New everything, correct bucket, different options set)
- Changed /src/components/multi-file-dropzone.tsx          (Added into the FileState type, plus minor initialization changes)

    *Project must target es2015: "compilerOptions": "target": "es2015"...
    Because of: "only works when using the '--downlevelIteration' flag or with a '--target' of 'es2015' or higher."
    Things like: console.log(...urlSizeMapVFS.entries()); -OR- 
    const merged = new Map([...urlSizeMapVFS, ...uploadedFileUrlsAndSizes]);
    ^^^ These only work with es2015.


# How to run

1. Create an account
Create your account at https://dashboard.edgestore.dev/ and create a new project.

2. Run these commands

Copy the .env.example file to .env
and fill in the variables

cp .env.example .env

# Install dependencies
npm install

# Run the app
npm run dev

# Test the app
You should be able to access these endpoints:

http://localhost:3000/
http://localhost:3000/protected
