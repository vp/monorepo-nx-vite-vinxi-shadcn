export type PostsArticleProps = {
  title: string;
  body: string;
};
export const PostsArticle = ({ title, body }: PostsArticleProps) => (
  <article className="mx-auto w-full format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
    <header className="mb-4 lg:mb-6 not-format py-2">
      <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
        Best practices for successful prototypes
      </h1>
      <address className="flex items-center not-italic">
        <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
          <img
            className="mr-4 w-16 h-16 rounded-full"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt="Jan Novak"
          />
          <div>
            <a
              href="#"
              rel="author"
              className="text-xl font-bold text-gray-900 dark:text-white"
            >
              Jan Novak
            </a>
            <p className="text-base text-gray-500 dark:text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <p className="text-base text-gray-500 dark:text-gray-400">
              <time dateTime="2022-02-08" title="February 8th, 2022">
                Feb. 8, 2022
              </time>
            </p>
          </div>
        </div>
      </address>
    </header>
    <div className="prose lg:prose-lg p-2 max-w-none dark:prose-invert">
      <h4>{title}</h4>
      <p>{body}</p>
    </div>
  </article>
);
