import { updateDoc, collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase';

const UserService = {
  async addPokemonToUser(pokemonId: string, userId: string) {
    try {
      const ref = collection(firestore, 'users', userId, 'pokemons');
      const snapshot = await addDoc(ref, {
        pokemonId,
      });
      return snapshot;
    } catch (error) {
      console.log(error);
    }
  },

  async removePokemonFromUser(pokemonId: string, userId: string) {
    try {
      const ref = collection(firestore, 'users');
      // @ts-ignore
      const snapshot = await updateDoc(ref, {
        pokemonId,
        userId,
      });
      return snapshot;
    } catch (error) {
      console.log(error);
    }
  },
};

export default UserService;
