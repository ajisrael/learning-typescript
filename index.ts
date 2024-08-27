import axios from "axios";
import { AxiosPromise } from "axios";

interface Lesson {
	id: number;
	description: string;
}

function getLesson(lessonId: number): AxiosPromise<Lesson> {
	return axios.get(`lessons/${lessonId}`);
}

const promise = getLesson(1);

promise.then(response => {
	...
});
