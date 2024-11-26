import { Body, Controller, Get, NotFoundException, Param, Post, Render } from '@nestjs/common';
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
    return this.travels.add(newData)
  }





}
