import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface CaseStudy {
  _id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

@Component({
  selector: 'app-case-studies-section',
  templateUrl: './case-studies-section.component.html',
  styles: []
})
export class CaseStudiesSectionComponent implements OnInit {
  caseStudies: CaseStudy[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCaseStudies();
  }

  fetchCaseStudies(): void {
    const apiUrl = 'http://localhost:3000/api/posts/case-studies?perPage=3'; 

    this.http.get<{ posts: CaseStudy[]; total: number }>(apiUrl).subscribe(
      (response) => {
        this.caseStudies = response.posts.map(caseStudy => {
          return {
            _id: caseStudy._id,
            title: caseStudy.title,
            description: caseStudy.description.trim().slice(0, 100) + '...',
            image: caseStudy.image,
            link: `/post/${caseStudy._id}` 
          };
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
