type Category = {
  href: string;
  name: string;
};

type Author = {
  href: string;
  imageUrl: string;
  name: string;
};

export class CourseEntity {
  public readonly courseId: string;
  public readonly title: string;
  public readonly description: string;
  public readonly imageUrl: string;
  public readonly category: Category;
  public readonly author: Author;
  public readonly datetime: string;
  public readonly date: string;
  public readonly readingTime: string;

  constructor({
    courseId,
    title,
    description,
    imageUrl,
    category,
    author,
    datetime,
    date,
    readingTime,
  }: {
    courseId: string;
    title: string;
    description: string;
    imageUrl: string;
    category: Category;
    author: Author;
    datetime: string;
    date: string;
    readingTime: string;
  }) {
    this.courseId = courseId;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.category = category;
    this.author = author;
    this.datetime = datetime;
    this.date = date;
    this.readingTime = readingTime;
  }
}
