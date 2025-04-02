import { Team, TeamSwitcher } from '@/components/blocks/team-switcher';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from '@workspace/ui/components/ui/sidebar';
import { Label } from '@workspace/ui/components/ui/label';
import { Search } from 'lucide-react';

export const AppSidebarHeader = ({ teams }: { teams: Team[] }) => (
  <>
    <TeamSwitcher teams={teams} />
    <SidebarGroup className="py-0 group-data-[collapsible=icon]:hidden">
      <SidebarGroupContent>
        <form className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput
            id="search"
            placeholder="Search the docs..."
            className="pl-8"
          />
          <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
        </form>
      </SidebarGroupContent>
    </SidebarGroup>
  </>
);
