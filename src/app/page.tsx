"use client";

import {
  MultiFileDropzone,
  type FileState,
} from "@/components/multi-file-dropzone";
import { useEdgeStore } from "@/lib/edgestore";
{/** Alternatively:
import { useEdgeStore } from '~/lib/edgestore'
import {
    MultiFileDropzone,
    type FileState,
  } from '~/components/MultiFileDropzone';
*/}
import Link from "next/link";
import { useState } from "react";

export default function Page() {

  {/** 📄 Note: tracking URLs (plus their count, and total size) isn't reliable
    when done just via the fileStates array of type FileState (objects): sometimes you
    get a few blanks, losing the URLs, even though the files are uploaded to the EdgeStore bucket.
    Similarly, doing so instead via the default recommended pathway (after the "if (progress === 100)"
    code block) -or- at the end of the 'TRY' block will also miss a few - a few OTHER (we *ASSUME*) urls.
    So the best strategy is to use both pathways, and then compare both and verify them both on submit.*/}
  
  {/** 💽 💾 💿 📼 📷 🎥 Beginning of Edgestore Photo / Video Upload Functionality */}

  {/** 🕹️ Stock functionality */}

  {/** 💎 Method 1: 1️⃣ VFS (Via File State) - via the above (stock) array of FileState objects */}
  const [fileStates, setFileStates] = useState<FileState[]>([]);

  const { edgestore } = useEdgeStore();
  {/** 🕹️ Stock functionality 📖✏️:

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }
  */}
  
  {/** 🕹️ Expanded functionality 🔰: */}

  function updateFileProgress(key: string, progress: FileState['progress'], url: string, size: number) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key,
      );
      if (fileState) {
        fileState.progress = progress;
        fileState.url = url;
        fileState.size = size;
        console.log('fileState.progress = ' + progress);
        console.log('fileState.url = ' + url);
        console.log('fileState.size = ' + size);
        // added logic to store url
        {/**
        if (fileState.progress === 'COMPLETE') {
            console.log('fileState.progress === COMPLETE');
            fileState.url = url; // Expanded functionality
            fileState.size = size; // Expanded functionality
        }*/}
      }
      return newFileStates;
    });
  }


  {/** 💎 Method 2: 2️⃣ Direct, via our own Map: uploadedFileUrlsAndSizes (below) */}
  const [uploadedFileUrlsAndSizes, setUploadedFileUrlsAndSizes] = useState<Map<string, number>>(new Map());

  {/** 💎 Method 3: 3️⃣ Direct, via our own Map: uploadedFileUrlsAndSizesTwo (below) */}
  const [uploadedFileUrlsAndSizesTwo, setUploadedFileUrlsAndSizesTwo] = useState<Map<string, number>>(new Map());

  {/** 💽 💾 💿 📼 📷 🎥 End of Edgestore Photo / Video Upload Functionality */}

  {/** BEGIN the Form Functionality area (form / divs controlling navigation), except the Upload Form itself */}
  {/** END the Form Functionality area (form / divs controlling navigation), except the Upload Form itself */}

  {/** 🔗 Prepare all data for uploading to dB: */}

  {/** URL Tracking 1 of 2: check for blanks via Method 1: VFS, "Via File State" - the useState<FileState[]>([]); */}

  // New map from the array of FileState objects, called fileStates
  const urlSizeMapVFS = fileStates.reduce((map, item) => {
      map.set(item.url, item.size);
      console.log('Mapped! URL :', item.url, ', Size: ', item.size);
      return map;
  }, new Map<string, number>());

  // Clean up in case of any blanks
  urlSizeMapVFS.delete('');

    {/** NB: 1.10.2023 Update ... 
        Project must target es2015: "compilerOptions": {    "target": "es2015",
        Because of: "only works when using the '--downlevelIteration' flag or with a '--target' of 'es2015' or higher."
        Things like: console.log(...urlSizeMapVFS.entries()); -OR- 
        const merged = new Map([...urlSizeMapVFS, ...uploadedFileUrlsAndSizes]);
        ^^^ These only work with es2015.
    */}
  
  {/** URL Tracking 2 of 2 - Merge the three maps: 💎 Method 2 2️⃣ + PLUS + 💎 Method 3 3️⃣ */}

  // Map uploadedFileUrlsAndSizes already exists and is set by the setter, so:
  uploadedFileUrlsAndSizes.delete('');

  // Map uploadedFileUrlsAndSizesTwo already exists and is set by the setter, so:
  uploadedFileUrlsAndSizesTwo.delete('');
  
  // Merge the three maps:
  const mergedUrlsAndSizes = new Map([...urlSizeMapVFS, ...uploadedFileUrlsAndSizes, ...uploadedFileUrlsAndSizesTwo]);

  // Get the count of the URLs of uploaded files, as string since we're about to upload it to text fields in our dB
  const filecount = mergedUrlsAndSizes.size.toString();

  // Get the total sum of the sizes (in bytes) of uploaded files:
  const size = Array.from(mergedUrlsAndSizes.values()).reduce((a, b) => a + b, 0);

  // Get a merged string that is just the URLs concatenated using commas (no spaces):
  const urls = Array.from(mergedUrlsAndSizes.keys()).join(',');

  {/** Supabase Insert Here - via imported Supabase client. Something like the below works:

  const { error , status } = await supabaseEstimateClient.from('estimates').insert({ name, email, body, filecount, phone, zip, urls, size });

  if (error) {
      throw error;
  }
  if (status === 201) {
      console.log('HTTP 201: Request successfully processed and a new resource has been created');
      console.log('XXX Total size, in bytes: ' + size);
      console.log('XXX FORMATTED bytes fn' + formatBytes(Number(size)));
      // {error: null, data: null, count: null, status: 201, statusText: ''}
  }

  */}

  {/** BEGIN the Form Functionality area (form / divs controlling navigation), except the Upload Form itself */}
  {/** END the Form Functionality area (form / divs controlling navigation), except the Upload Form itself */}

  return (
    <div className="flex flex-col items-center m-6 gap-2">
      {/* Start of the <MultiFileDropzone> outer div below*/} 
      {/* Beginning of <MultiFileDropzone> TAG */}
      <MultiFileDropzone
          value = {fileStates}
          dropzoneOptions={{
              maxSize: 16128 * 12096 * 2024, // 2024MB client-side limit
              maxFiles: 20, // 20 Files
          }}
          onChange = {(files) => {
              setFileStates(files);
          }}
          onFilesAdded = {async (addedFiles) => {
            setFileStates([...fileStates, ...addedFiles]);
            await Promise.all(
              addedFiles.map(async (addedFileState) => {
              try {
                  const res = await edgestore.requestedEstimates.upload({
                  file: addedFileState.file,
                  onProgressChange: async (progress) => {
                      updateFileProgress(addedFileState.key, progress, '', 0);
                      if (progress === 10) {
                            // wait 1 second to set it to complete
                            // so that the user can see the progress bar at 100%
                            {/** await new Promise((resolve) => setTimeout(resolve, 600));
                            ^^ Breaks on Safari (MacBook): https://github.com/sveltejs/kit/issues/2889
                            "unhandled promise rejection referenceerror cannot access uninitialized variable"
                            Top-level awaits will break on Safari. Use a named function instead:
                            */} 
                          await macBookCompatibleDelay(6);
                      {/** 💎 Method 1: 1️⃣ VFS (Via File State) - via the above (stock) array of FileState objects */}
                          updateFileProgress(addedFileState.key, 'PENDING', res.url, res.size); 
                      {/** 💎 Method 2: 2️⃣ Direct, via our own Map: uploadedFileUrlsAndSizes (below) */}    
                          setUploadedFileUrlsAndSizes(prevState => {
                              const newMap = new Map(prevState);
                              newMap.set(res.url, (newMap.get(res.url) || 0) + res.size);
                              return newMap;
                          });                    
                      } else if (progress === 100) {
                            // wait 1 second to set it to complete
                            // so that the user can see the progress bar at 100%
                            {/** await new Promise((resolve) => setTimeout(resolve, 600));
                            ^^ Breaks on Safari (MacBook): https://github.com/sveltejs/kit/issues/2889
                            "unhandled promise rejection referenceerror cannot access uninitialized variable"
                            Top-level awaits will break on Safari. Use a named function instead:
                            */}
                          await macBookCompatibleDelay(6);
                    {/** 💎 Method 1: 1️⃣ VFS (Via File State) - via the above (stock) array of FileState objects */}
                          updateFileProgress(addedFileState.key, 'COMPLETE', res.url, res.size);
                    {/** 💎 Method 3: 3️⃣ Direct, via our own Map: uploadedFileUrlsAndSizesTwo (below) */}      
                          setUploadedFileUrlsAndSizesTwo(prevState => {
                              const newMapTwo = new Map(prevState);
                              newMapTwo.set(res.url, (newMapTwo.get(res.url) || 0) + res.size);
                              return newMapTwo;
                          });                    
                      }
                  },
                  });
                  // Can also run our logic here:                                       
              } catch (err) {
                  updateFileProgress(addedFileState.key, 'ERROR', 'Error caught', 0);
                  // type 'number | "PENDING" | "COMPLETE" | "ERROR"'
              }
              }),
          );
          }}
        />{/* End of <MultiFileDropzone> TAG */}
      {/* End of the <MultiFileDropzone> outer div*/} 
    </div>
  );
}

function macBookCompatibleDelay(milliseconds: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      console.log('Setting macBookCompatibleDelay to: 1 x 600 ms');
      resolve();
    }, milliseconds * 100);
  });
}