import { create } from "zustand";

interface TGettingStartedState {
    gender: string;
    weight: string;
    height: string;
    age: string;
    activityLevel: string;
    currentStep: number;
    setGender: (gender: string) => void;
    setWeight: (weight: string) => void;
    setHeight: (height: string) => void;
    setAge: (age: string) => void;
    setActivityLevel: (activityLevel: string) => void;
    setStep: (step: number) => void;
    getAllData: () => { gender: string; weight: string; height: string; activityLevel: string, age: string };
    clearAllData: () => void;
};

const useGettingStartedStore = create<TGettingStartedState>((set) => ({
    gender: '',
    weight: '',
    height: '',
    age: '',
    activityLevel: '',
    currentStep: 1,
    setGender: (gender) => set({ gender }),
    setWeight: (weight) => set({ weight }),
    setHeight: (height) => set({ height }),
    setAge: (age) => set({ age }),
    setActivityLevel: (activityLevel) => set({ activityLevel }),
    setStep: (step) => set({ currentStep: step }),
    getAllData: () => {
        const state: Partial<TGettingStartedState> = useGettingStartedStore.getState();
        return {
            gender: state.gender || '',
            weight: state.weight || '',
            height: state.height || '',
            age: state.age || '',
            activityLevel: state.activityLevel || '',
        };
    },
    clearAllData: () => {
        set({
            gender: '',
            weight: '',
            height: '',
            age: '',
            activityLevel: '',
            currentStep: 1,
        })
    },
}));

export default useGettingStartedStore;
