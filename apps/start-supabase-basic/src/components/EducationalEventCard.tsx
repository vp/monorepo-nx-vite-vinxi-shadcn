import { Calendar, Image, Tv } from 'lucide-react';
import { Card, CardContent } from '@workspace/ui/components/ui/card';

export type EducationalEventCardProps = {
  title: string;
  speaker: string;
  description: string;
  onlineParticipants: number;
  offlineParticipants: number;
  date: string;
  imageUrl?: string;
};
export default function EducationalEventCard({
  title,
  speaker,
  description,
  onlineParticipants,
  offlineParticipants,
  date,
  imageUrl,
}: EducationalEventCardProps) {
  return (
    <Card className="overflow-hidden py-0">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/5 relative h-[300px] md:h-auto bg-blue-50">
          <Image src={imageUrl} alt={title} />
          {/* Overlay text to simulate the presentation slide text */}
          <div className="absolute top-10 left-10 right-10 text-rose-300 font-medium text-lg">
            {title}
          </div>
        </div>
        <CardContent className="md:w-3/5 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{title}</h2>

            <p className="text-lg font-medium">{speaker}</p>

            <p className="text-base text-muted-foreground">{description}</p>

            <div className="space-y-1">
              <div className="flex items-center">
                <span className="text-xl font-bold">{onlineParticipants}</span>
                <span className="ml-2 text-muted-foreground">
                  účastníků online
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-xl font-bold">{offlineParticipants}</span>
                <span className="ml-2 text-muted-foreground">offline</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{date}</span>
            </div>
            <div className="text-muted-foreground">
              <Tv className="w-6 h-6" />
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
