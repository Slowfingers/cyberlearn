import { COSMETICS } from '../curriculum/playerCatalog';
import type { User } from '../types';
/** Profile equipment is the only source of player identity. Legacy inventory IDs remain intact. */
export function getPlayerCharacter(user?: Pick<User, 'equipped'> | null) {
  const avatar = COSMETICS.find(item => item.type === 'avatar' && item.id === user?.equipped?.avatar);
  const frame = COSMETICS.find(item => item.type === 'avatarFrame' && item.id === user?.equipped?.avatarFrame);
  return { avatarId: avatar?.value ?? '2', frameId: frame?.id, name: avatar?.name ?? 'Орион' };
}
