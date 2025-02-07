import { Controller, Post, HttpCode, HttpStatus, Query, Body, BadRequestException, Get } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBody } from '@nestjs/swagger';
import { CertificateInterface } from './interfaces/certificate.interface';


@ApiTags('service')
@Controller('service')
export class ServiceController {
    constructor(private readonly serviceService: ServiceService) { }

    // Get certificate information by domain
    // Получение информации о сертификате по домену
    @Get('certificate')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Get service certificate information" })
    @ApiQuery({
        name: 'domain',
        description: 'Domain to search certificate for',
        required: true,
        type: String,
    })
    @ApiResponse({ status: 200, description: 'Certificate information received' })
    @ApiResponse({ status: 400, description: 'Data entry error' })
    @ApiResponse({ status: 500, description: 'Error while querying NEAR' })
    async getCertificate(@Query('domain') domain: string): Promise<{ message: string; certificate?: CertificateInterface }> {
        if (!domain) {
            throw new Error('Domain is required');
        }

        const certificate = await this.serviceService.getCertificate(domain);

        if (certificate) {
            return { message: 'Certificate found', certificate };
        } else {
            return { message: 'Certificate not found' };
        }
    }

    // Get certificate information by number
    // Получение информации о сертификате по номеру
    @Get('certificate/number')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Get service certificate information by number" })
    @ApiQuery({
        name: 'certNumber',
        description: 'Certificate number to search for',
        required: true,
        type: String,
    })
    @ApiResponse({ status: 200, description: 'Certificate information received' })
    @ApiResponse({ status: 400, description: 'Data entry error' })
    @ApiResponse({ status: 500, description: 'Error while querying NEAR' })
    async getCertificateByNumber(@Query('certNumber') certNumber: string): Promise<{ message: string; certificate?: CertificateInterface }> {
        if (!certNumber) {
            throw new Error('Certificate number is required');
        }

        const certificate = await this.serviceService.getCertificateByNumber(certNumber);

        if (certificate) {
            return { message: 'Certificate found', certificate };
        } else {
            return { message: 'Certificate not found' };
        }
    }

    @Post('register')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Register service and get certificate" })
    @ApiBody({
        description: 'Service registration data',
        schema: {
            type: 'object',
            properties: {
                domain: { type: 'string', example: 'example.com' },
                name: { type: 'string', example: 'My Service' },
            },
            required: ['domain', 'name'],
        },
    })
    @ApiResponse({ status: 200, description: 'Service registered successfully' })
    @ApiResponse({ status: 400, description: 'Data entry error or service already registered' })
    @ApiResponse({ status: 500, description: 'Error while querying NEAR' })
    async registerService(@Body() body: { domain: string; name: string; }): Promise<{ message: string; certificate?: CertificateInterface }> {
        const { domain, name } = body;

        if (!domain || !name) {
            throw new BadRequestException('All fields are required');
        }

        const result = await this.serviceService.registerService(domain, name);

        return result;
    }
}
