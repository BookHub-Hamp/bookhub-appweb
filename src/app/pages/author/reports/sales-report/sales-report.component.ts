import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Chart, ChartOptions, ChartData } from 'chart.js/auto';
import { AuthorBookSalesReportDTO } from '../../../../shared/models/author-book-sales-report.model';
import { BookService } from '../../../../core/services/book.service';

@Component({
  selector: 'app-sales-report',
  standalone: true,
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {
  reportData: AuthorBookSalesReportDTO[] = [];
  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: 'Cantidad Vendida' }]
  };
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (context) => `Cantidad: ${context.raw}`
        }
      }
    }
  };

  @ViewChild('salesChart', { static: true }) salesChart!: ElementRef;

  private bookService = inject(BookService);

  ngOnInit(): void {
    this.bookService.getAuthorBookSalesReport().subscribe({
      next: (data) => {
        this.reportData = data;
        this.prepareChartData();
        this.renderChart();
      },
      error: (error) => {
        console.error('Error al cargar el reporte de ventas:', error);
      }
    });
  }

  prepareChartData(): void {
    this.chartData.labels = this.reportData.map(item => item.bookTitle);
    this.chartData.datasets[0].data = this.reportData.map(item => item.totalQuantitySold);
  }

  renderChart(): void {
    new Chart(this.salesChart.nativeElement, {
      type: 'bar',
      data: this.chartData,
      options: this.chartOptions,
    });
  }
}
