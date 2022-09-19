import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-barcodescan',
  templateUrl: './barcodescan.component.html',
  styleUrls: ['./barcodescan.component.css']
})


export class BarcodescanComponent implements OnInit {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX /*, ...*/ ];
  qrResultString: string;
  barcode = {};
  starRating = 5;
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

  constructor(private http: HttpClient,private fb: FormBuilder) { }
  ageranges = {}
  saltcomp : any
  times : any
  saltComparison(agerange: any) {
    //alert(JSON.stringify(agerange));
    this.ageranges = JSON.stringify(agerange);
    const upload_age_range$ = this.http.post("https://foodallergyprod.azurewebsites.net/age_range",this.ageranges,{headers: this.headers});
    upload_age_range$.subscribe(res => {
      //alert(res)
      this.result = res
      this.saltcomp = this.result['age_range']
      this.times = this.result['times']
      this.times = this.times.toFixed(2);
      console.log(this.result);
      });
  }

  barcodeId(barcodeid:string){
     // alert(barcodeid)
      this.onCodeResult(barcodeid)
  }

  ngOnInit(): void {
  }

  clearAllergens(){
    //alert("cleared allergens")
    const clearallergens$ = this.http.get("https://foodallergyprod.azurewebsites.net/clearallergens");
    clearallergens$.subscribe(res => {
      console.log(res)
    });
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

  }

  clearResult(): void {
    this.qrResultString = "";
  }

  result: any
  allergyresult : any
  x : any
  sugar : any
  compare_to_intake : any
  teaspoons: any
  numbers : any
  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.barcode = {barcode : this.qrResultString}
    console.log("res" + this.qrResultString)
    const upload$ = this.http.post("https://foodallergyprod.azurewebsites.net/barcode_post",this.barcode,{headers: this.headers});
    //upload$.subscribe();

    upload$.subscribe(res => {
      this.result = res
      this.x = this.result.result.split(" ",3)
      if(this.x[0] == "go")
      {
          this.allergyresult = "no"
          alert("According to our data, sourced from ASCIA, the product you have scanned does not contain any allergens</p>")
      }
      if(this.x[0] == "product"){
          this.allergyresult = "na"
          alert("This product is not found in the database")
      }
      if(this.x[1] == "having"){
          this.allergyresult = "yes"
          alert("According to our data, sourced from ASCIA, the product you have scanned may contain traces of. It is suggested to be wary of the product if decided to be used or bought.")
      }

      //alert(this.allergyresult)
      console.log(this.result);
      this.sugar = this.result['sugar'];
      this.compare_to_intake = this.result['compare_to_intake'];
      this.teaspoons = this.result['teaspoons'];
      //console.log(this.sugar)
      this.teaspoons = Math.round(this.teaspoons)
      console.log("no of tra"+this.teaspoons)
      if (isNaN(this.teaspoons)){
        console.log("sdcvs")
        this.teaspoons = 0; 
      }
      });
    }
}
