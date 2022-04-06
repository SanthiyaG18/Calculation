import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Calculate } from '../calculate';
import { ServiceService } from '../service.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
export class Result{
  constructor(
   
    public num1:  number,
    public num2:  number,
    public type:  string,
    public result:  number,
    public message:  string,
    public createdDate:  string,
    public createdTime:string

  ){}
}
@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {

 

  results:Result[] = [];
  exform!: FormGroup;

  num1 :number=0;
  num2:number=0;
  type:string='';
  result:  number=0;
  message:  string='';
  createdDate:  string='';
  createdTime: string='';

  submitted=false;

  private page:number=1;
  public value:Array<any>=[];
  public pages:Array<number>=[];
  //private limit:any;
  



  constructor(private service:ServiceService,private router:Router,private http:HttpClient) {
   
   }
   

   setPage(i: number,event:any){
     event.preventDefault();
     this.page=i;
     this.getvalue();

   }
  // totalLength:any;
   //page:number=1;
  
   
  ngOnInit(): void {
  //  this.getlist();
    this.getvalue();
    this.exform=new FormGroup({
      'num1':new FormControl(null,Validators.required),
      'num2':new FormControl(null,Validators.required),
      'type':new FormControl('',Validators.required)
    });
  }
  clicksub(){
    console.log(this.exform.value);
    this.exform.reset();
    }
  save() {
   this.service.createcalculation(new Calculate(this.num1,this.num2,this.type)).subscribe(
     (data)=>{
       console.log(data);
      // this.getlist();
      }
   );
    }
  submit() {
    this.submitted = true;
    this.save();    
  }
  // getlist() {
  //   this.service.getlistvalues().subscribe((data:Result[])=>{
  //      this.results=data;
  //// this.totalLength=data.length;

  //     console.log(data);
  //       }
  // );
  //   }

    getvalue(){
      this.service.getValue(this.page).subscribe((data:any)=>{

          console.log(data);
          this.value=data['content'];
          this.pages=new Array(data['totalPages']);
          //this.limit=data.length;
    
      }
      );
    }
  

}


