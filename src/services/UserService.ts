import { updateDoc, collection, addDoc, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';

const UserService = {
  async addPokemonToUser(pokemonId: string, userId: string, pokemons: any) {
    try {
      const ref = collection(firestore, 'users');
      console.log(pokemons.length);
      if (pokemons.length > 6) {
        throw new Error('You can only have 6 pokemons');
      }

      const snapshot = await addDoc(ref, {
        pokemonId,
        userId,
      });

      return snapshot;
    } catch (error: any) {
      throw new Error(error);
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

  async getAllUserPokemons(userId: string) {
    try {
      const ref = collection(firestore, 'users');
      const snapshot = await getDocs(ref);
      const data = snapshot.docs.map((doc) => {
        if (doc.data().userId === userId) {
          return doc.data();
        }

        return [];
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default UserService;
