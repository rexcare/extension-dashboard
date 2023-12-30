type Props = {
  content: string;
  author: string;
};

export default function QuoteBlock({ content, author }: Props) {
  return (
    <div className="flex flex-col space-y-1">
      <p className="text-ellipsis text-shadow font-bold">{content}</p>
      <p className="text-base text-end text-shadow">
        <span>&mdash; </span>
        {author}
      </p>
    </div>
  );
}
