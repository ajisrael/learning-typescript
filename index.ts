import * as rp from 'request-promise';

interface Lesson {
	id: number;
	description: string;
}

function getLesson(lessonId: number): Promise<Lesson> {
	return rp.get(`lessons/${lessonId}`);
}

const promise = getLesson(1);

promise.then(lesson => {
	// .... we want this lesson variable to be implicitly of type Lesson
});
