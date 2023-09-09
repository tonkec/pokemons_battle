import {
  deleteDoc,
  collection,
  addDoc,
  getDocs,
  doc,
} from 'firebase/firestore';
import { firestore } from '../firebase';

const UserService = {
  async addPokemonToUser(pokemonId: string, userId: string, pokemons: any) {
    try {
      const ref = collection(firestore, 'users', userId, 'pokemons');
      if (pokemons.length > 6) {
        throw new Error('You can only have 6 pokemons');
      }

      const snapshot = await addDoc(ref, {
        url: pokemonId,
        userId,
      });

      return snapshot;
    } catch (error: any) {
      throw new Error(error);
    }
  },

  async removePokemonFromUser(pokemonUrl: string, userId: string) {
    try {
      const ref = collection(firestore, 'users', userId, 'pokemons');
      // delete all pokemons from user

      const snapshot = await getDocs(ref);
      const data = snapshot.docs.map((doc) => {
        if (doc.data().url === pokemonUrl) {
          deleteDoc(doc.ref);
        }
      });

      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  },

  async getAllUserPokemons(userId: string) {
    try {
      const ref = collection(firestore, 'users', userId, 'pokemons');
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

  async getAllUsers() {
    try {
      const ref = collection(firestore, 'users');
      const snapshot = await getDocs(ref);
      const data = snapshot.docs.map((doc) => {
        return doc.data();
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default UserService;
