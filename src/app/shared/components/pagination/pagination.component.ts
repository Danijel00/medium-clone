import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'mc-pagination',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, NgxPaginationModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 0;
  @Input() pageLimit: number = 20;
  @Input() url: string = '';
  public pagesCount: number = 1;
  public pages: number[] = [];

  constructor(private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.pagesCount = Math.ceil(this.totalPages / this.pageLimit);

    this.pages =
      this.pagesCount > 0 ? this.utilsService.range(1, this.pagesCount) : []
  }
}

