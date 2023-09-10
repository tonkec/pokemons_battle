import {
  updateDoc,
  collection,
  addDoc,
  getDocs,
  DocumentReference,
} from 'firebase/firestore';
import { firestore } from '../firebase';
import { DocumentData } from '@firebase/firestore-types';

const UserService = {
  async addPokemonToUser(userId: string, pokemons: any) {
    const updateExistingPokemons = (
      doc: DocumentData,
      userRef: DocumentReference
    ) => {
      if (doc.data().pokemons.length < 6) {
        updateDoc(userRef, {
          pokemons: [...doc.data().pokemons, ...pokemons],
        });
      } else {
        throw new Error('You already have 6 pokemons');
      }
    };

    const createNewPokemons = (userRef: DocumentReference) => {
      if (pokemons.length < 6) {
        updateDoc(userRef, {
          pokemons,
        });
      } else {
        throw new Error('You already have 6 pokemons selected');
      }
    };

    try {
      const ref = collection(firestore, 'users');
      const querySnapshot = await getDocs(ref);
      querySnapshot.forEach((doc) => {
        if (doc.data().userId === userId) {
          const userRef = doc.ref;
          const alreadyHasPokemons = doc.data().pokemons;

          return alreadyHasPokemons
            ? updateExistingPokemons(doc, userRef)
            : createNewPokemons(userRef);
        }
      });

      return querySnapshot;
    } catch (error: any) {
      throw new Error(error);
    }
  },

  async removePokemonFromUser(pokemonUrl: string, userId: string) {
    try {
      const ref = collection(firestore, 'users');
      const querySnapshot = await getDocs(ref);
      querySnapshot.forEach((doc) => {
        if (doc.data().userId === userId) {
          const userRef = doc.ref;
          const newPokemons = doc
            .data()
            .pokemons.filter((pokemon: any) => pokemon.url !== pokemonUrl);
          updateDoc(userRef, {
            pokemons: newPokemons,
          });
        }
      });

      return querySnapshot;
    } catch (error: any) {
      throw new Error(error);
    }
  },

  async getAllUserPokemons(userId: string) {
    try {
      const ref = collection(firestore, 'users');
      const querySnapshot = await getDocs(ref);
      let pokemons: any = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().userId === userId) {
          pokemons = doc.data().pokemons;
        }
      });

      return pokemons;
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

  async createUser(name: string, rank: number, userId: string) {
    try {
      const ref = collection(firestore, 'users');
      const querySnapshot = await getDocs(ref);
      let userExists = false;
      querySnapshot.forEach((doc) => {
        if (doc.data().name === name) {
          userExists = true;
        }

        if (doc.data().userId === userId) {
          userExists = true;
        }
      });

      if (userExists) {
        throw new Error('User already exists');
      } else {
        const snapshot = await addDoc(ref, {
          name,
          rank,
          userId,
        });
        return snapshot;
      }
    } catch (error) {
      console.log(error);
    }
  },

  async getUserById(userId: string) {
    try {
      const ref = collection(firestore, 'users');
      const querySnapshot = await getDocs(ref);
      let user: any = {};
      querySnapshot.forEach((doc) => {
        if (doc.data().userId === userId) {
          user = doc.data();
        }
      });

      return user;
    } catch (error) {
      console.log(error);
    }
  },

  async getUserByName(name: string) {
    try {
      const ref = collection(firestore, 'users');
      const querySnapshot = await getDocs(ref);
      let user: any = {};
      querySnapshot.forEach((doc) => {
        if (doc.data().name === name) {
          user = doc.data();
        }
      });

      return user;
    } catch (error) {
      console.log(error);
    }
  },

  async updateUserRank(userId: string, rank: number) {
    try {
      const ref = collection(firestore, 'users');
      const querySnapshot = await getDocs(ref);
      querySnapshot.forEach((doc) => {
        if (doc.data().userId === userId) {
          const userRef = doc.ref;
          updateDoc(userRef, {
            rank,
          });
        }
      });

      return querySnapshot;
    } catch (error: any) {
      throw new Error(error);
    }
  },
};

export default UserService;
