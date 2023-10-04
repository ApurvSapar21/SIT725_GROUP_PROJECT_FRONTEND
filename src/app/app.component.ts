import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

export interface Cartoon {
  id: number;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // Updated path to your HTML file
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  AllergiesRoles = [
    {
      Id: 1,
      Name: "Dairy",
      Checked: false
    },
    {
      Id: 2,
      Name: "Shellfish",
      Checked: false
    },
    {
      Id: 3,
      Name: "Wheat",
      Checked: false
    },
    {
      Id: 4,
      Name: "Soy",
      Checked: false
    },
    {
      Id: 5,
      Name: "Sesame",
      Checked: false
    },
    {
      Id: 6,
      Name: "Egg",
      Checked: false
    },
    {
      Id: 7,
      Name: "Peanut",
      Checked: false
    },
    {
      Id: 8,
      Name: "Treenut",
      Checked: false
    }
  ]

  allowedFormats = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX /*, ...*/];
  qrResultString: string;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  barcode = {};

  userallergies = {}

  editAllergyRolesSubmit() {
    console.log(this.AllergiesRoles);
    this.userallergies = { allergies: this.AllergiesRoles }
    console.log(this.userallergies)
    const upload_allergies$ = this.http.post("https://foodallergyprod.azurewebsites.net/user_allergies", this.userallergies, { headers: this.headers });
    upload_allergies$.subscribe();
  }

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  clearResult(): void {
    this.qrResultString = "";
  }

  result: any
  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.barcode = { barcode: this.qrResultString }
    console.log("res" + this.qrResultString)
    const upload$ = this.http.post("https://foodallergyprod.azurewebsites.net/barcode_post", this.barcode, { headers: this.headers });
    //upload$.subscribe();

    upload$.subscribe(res => {
      this.result = res
      alert(this.result.result)
      console.log(this.result);
    });
  }
}
