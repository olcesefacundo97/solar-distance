import { Controller, Get } from '@nestjs/common';

@Controller('solar')
export class SolarController {

  @Get('ping')
  getDistanceToSun(): { distance_to_sun_nm: number } {
    const distance_nm = this.calculateDistanceToSun();
    return { distance_to_sun_nm: distance_nm };
  }

  private calculateDistanceToSun(): number {
    const AU_IN_KM = 149597870.7; // Unidad Astronómica en kilómetros
    const KM_TO_NM = 1e+12; // Factor de conversión de kilómetros a nanómetros
    const ecc = 0.0167; // Excentricidad de la órbita terrestre

    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    const theta = 2 * Math.PI * (dayOfYear / 365.25); // Aproximar el ángulo basado en el día del año
    const distance_au = (1 - ecc ** 2) / (1 + ecc * Math.cos(theta));
    
    const distance_km = distance_au * AU_IN_KM;
    return distance_km * KM_TO_NM;
  }
}