import {
  defineVirtualSubtreeConfig,
  physical,
} from '@tanstack/virtual-file-routes';

export default defineVirtualSubtreeConfig([
  physical('', '../../features/auth/routes'),
]);
