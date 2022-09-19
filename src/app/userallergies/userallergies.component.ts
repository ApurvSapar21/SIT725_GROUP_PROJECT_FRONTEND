import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-userallergies',
  templateUrl: './userallergies.component.html',
  styleUrls: ['./userallergies.component.css']
})
export class UserallergiesComponent implements OnInit {
  navLinks = [
    { path: 'userallergies', label: 'Home' },
    { path: 'barcodescan', label: 'Food' }
  ];
  
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX /*, ...*/ ];
  qrResultString: string;
  barcode = {};
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

  constructor(private http: HttpClient,private fb: FormBuilder,private router: Router) 
  {
   }

   
  ngOnInit(): void {
  }

  userallergies = {}
  res = ""

  editAllergyRolesSubmit() {
    console.log("select "+this.AllergiesRoles[0].Name);
    this.userallergies = {allergies : this.AllergiesRoles}
    console.log(this.userallergies)
    for(let i = 0 ; i < this.AllergiesRoles.length ; i++){
      if (this.AllergiesRoles[i].Checked == true){
        this.res += this.AllergiesRoles[i].Name
        this.res += ","
      }         
    }
    this.res += "."
    //alert("selected allergens are:-" + this.res)
    this.res = ""
    const upload_allergies$ = this.http.post("https://foodallergyprod.azurewebsites.net/user_allergies",this.userallergies,{headers: this.headers});
    upload_allergies$.subscribe();
    this.router.navigate(['/barcodescan'])

  }

  clearResult(): void {
    this.qrResultString = "";
    
  }

  result: any
  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.barcode = {barcode : this.qrResultString}
    console.log("res" + this.qrResultString)
    const upload$ = this.http.post("https://foodallergyprod.azurewebsites.net/barcode_post",this.barcode,{headers: this.headers});
    //upload$.subscribe();

    upload$.subscribe(res => {
      this.result = res
      //alert(this.result.result)
      console.log(this.result);
      });
    }
}
