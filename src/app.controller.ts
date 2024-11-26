import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { get } from 'http';
import { TravelDataWithoutId, Travels } from './travels';
import { NotFoundError } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }
  travels: Travels = new Travels();

  @Get('travels')
  listTravels() {
    return this.travels.getAll();
  }


  @Get('travels/:travelid')
  getOneTravel(@Param('travelid') id:string){    
    let idNum = parseInt(id)
    let found = this.travels.getById(idNum);
    if(!found){ 
      throw new NotFoundException("ID wrong");
    }
    else{
      return found;
    }  
  }

  @Post('travels')
  postNewTravel(@Body() newData: TravelDataWithoutId)
  {
    if(newData.description.length < 30){
      throw new BadRequestException("Description not long enough")
    }
    if(newData.discount < 0 || newData.discount > 50){
      throw new BadRequestException("Invalid discount")
    }
    //ezt borzalmasan rondán csináltam, de nincs már se elég kávém, se elég türelmem szebbre összerakni
    return this.travels.add(newData) 
  }


  @Patch('travels/:travelid')
  modifyTravel(@Param('travelid') id:string, @Body() newPartialData: TravelDataWithoutId){
    let idNum = parseInt(id)
    const newData: TravelDataWithoutId = {
      ...this.travels.getById(idNum),
      ...newPartialData
    };
    try{
    return this.travels.replace(idNum,newData)
  }catch(e){
    return("ID wrong")
  }
  }

  @Delete('travels/:travelid')
  removeOneTravel(@Param('travelid') id:string){  
    
    
    let idNum = parseInt(id)
    let found = this.travels.remove(idNum);
    if(!found){ 
      throw new NotFoundException("ID wrong");
    }
  }





}
