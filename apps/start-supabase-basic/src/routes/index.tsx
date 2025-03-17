import { createFileRoute } from '@tanstack/react-router';
import EducationalEventCard from '~/components/EducationalEventCard';

export const Route = createFileRoute('/')({
  component: Home,
});

const events = [
  {
    title: 'Learn how to use Supabase',
    description: 'Join our free workshop and learn how to use Supabase.',
    date: '2021-08-01',
    time: '10:00',
    timezone: 'PST',
    offlineParticipants: 199,
    onlineParticipants: 23,
    speaker: 'John Doe',
    imageUrl: "/images/hare-9457418_1280.jpg"
  },
  {
    title: 'Learn how to use shared components',
    description: 'Join our free workshop and learn how to use shared components.',
    date: '2021-08-01',
    time: '10:00',
    timezone: 'PST',
    offlineParticipants: 199,
    onlineParticipants: 23,
    speaker: 'Jane Doe',
    imageUrl: "/images/green-cabbage-7769954_1280.jpg"
  },
  {
    title: 'Learn how to use nx for monorepos',
    description: 'Join our free workshop and learn how to use nx for monorepos.',
    date: '2021-08-01',
    time: '10:00',
    timezone: 'PST',
    offlineParticipants: 199,
    onlineParticipants: 23,
    speaker: 'Gerald Doe',
    imageUrl: "/images/cabbage-3722498_1280.jpg"
  },
];

function Home() {
  return (
    <main className="flex justify-center antialiased mt-10 px-4">

        <div className="flex flex-col gap-4 flex-1 max-w-[800px]">
          {events.map((eventItem, index) => (
            <EducationalEventCard key={index} {...eventItem} />
          ))}
        </div>

    </main>
  );
}
