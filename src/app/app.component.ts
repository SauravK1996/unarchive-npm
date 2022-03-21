import { Component, OnInit } from '@angular/core';
// import * as zip from "@zip.js/zip.js";
var chilkat = require('@chilkat/ck-node16-win64');


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'unarchive-angular';
  filename: string | undefined;
  filesize: number | undefined;
  filetype: any | undefined;
  password: string = 'password';

  filelist: Array<string> = [];
  filelistToUI: Array<string> = [];

  ngOnInit(): void {

  }



  async handleFileInput(event: any) {
    const file: File = event.target.files[0];


    // list(file.name, (err, result) => {
    //   console.log(result)
    // });


    this.filetype = file.type;
    this.filename = file.name;
    this.filesize = file.size;

    // console.log(file);

    var zip = new chilkat.Zip();
    var success = zip.OpenZip("something.zip");
    console.log('success : ', success);
    if (success !== true) {
      console.log(zip.LastErrorText);
      return;
    }

    var bPwdProt = zip.PasswordProtect;
    console.log('IsPassword : ', bPwdProt);
    if (bPwdProt) {
      console.log("This zip is password-protected.");
    }

    var encValue = zip.Encryption;
    console.log('Encrypted value : ', encValue);
    if (encValue == 4) {
      console.log("This zip is AES encrypted.");
    }

    zip.CloseZip();










    // file.arrayBuffer().then((arrayBuffer: ArrayBuffer) => {
    //   const blob = new Blob([new Uint8Array(arrayBuffer)], { type: file.type });
    //   // console.log(blob);
    // })

    // const fileToBlob = async (file: { arrayBuffer: () => any; type: any; }) => new Blob([new Uint8Array(await new Uint8Array(await file.arrayBuffer()))], { type: file.type });
    // const blob = await fileToBlob(file)

    // console.log(blob);
    // this.verifyZipPassword(blob, this.password);
  }


  // verifyZipPassword = async (blob: Blob, password: string) => {
  //   this.filelist = [];
  //   this.filelistToUI = [];
  //   let reader: zip.ZipReader;
  //   try {

  //     if(password!==undefined && password!==null && password!==''){
  //       reader = new zip.ZipReader(new zip.BlobReader(blob),{password});
  //     }else{
  //       reader = new zip.ZipReader(new zip.BlobReader(blob));
  //     }


  //     const entries = await reader.getEntries();

  //     console.log('Total entries : ' + entries.length)

  //     for (const entry of entries) {
  //       try {
  //         this.filelist.push(entry.filename + "  " + entry.encrypted);
  //         console.log(entry.filename + "  " + entry.encrypted);


  //         const x = await entry.getData(new zip.BlobWriter())
  //         console.log(x);

  //       } catch (error: any) {
  //         if (error.message === zip.ERR_ENCRYPTED) {
  //           console.log('Password Required')
  //           return false;
  //         } else if (error.message === zip.ERR_INVALID_PASSWORD) {
  //           console.log('Invalid password');
  //           return false;
  //         } else {
  //           throw error;
  //         }
  //       }
  //     }
  //     this.filelistToUI = this.filelist;
  //     await reader.close();
  //   } finally {
  //     // await reader.close();
  //   }
  //   return true;
  // };

}



