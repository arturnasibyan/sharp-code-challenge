import { Component, OnInit } from '@angular/core';
import { DoctorService } from './doctor.service';
import { Doctor } from './doctor';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'Sharp Code Challenge';
	familyPracticeDoctors: Doctor[] = [];
	pediatricDoctors: Doctor[] = [];

	constructor(private doctorService: DoctorService) { }

	ngOnInit() {
		this.getDoctors();
	}

	getDoctors(): void {
		this.doctorService.getDoctors()
			.subscribe(doctors => {
				// the member variables below will hold collections of doctors that are bound to the app.component.html template
				this.familyPracticeDoctors = this.processDoctorArray(doctors, 'Family Practice');
				this.pediatricDoctors = this.processDoctorArray(doctors, 'Pediatrics');
				console.log('FAMILY PRACTICE:' + JSON.stringify(this.familyPracticeDoctors));
				console.log('PEDIATRICS:' + JSON.stringify(this.pediatricDoctors));
			});
	}

	processDoctorArray(doctors: Doctor[], practiceType: String): Doctor[] {
		console.log(doctors);
		return this.orderByReviewDesc(doctors.filter(doctor => doctor.specialty === practiceType));
	}

	orderByReviewDesc(doctors: Doctor[]): Doctor[] {
		return doctors.sort(function(a, b) {return b.reviewCount - a.reviewCount; });
	}
}
