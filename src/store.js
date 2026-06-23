// src/store.js — Central state management
import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { SEED_TRAINEES, SEED_GROUPS, SEED_ORDERS, SEED_CERTS } from './data/seedData';

const STORE_KEY = 'njhps_v4';
const SEED_VERSION = 'v4_seed_1';

const defaultSettings = {
  password: 'njhps2024',
  sheetId: '1NlBKiGMv5BECwrdqN09zq92NxqSZlMUcMLHen-OyjoU',
  sheetTab: 'Form Responses 1',
  nextCard: 476,
  nextOrder: 235,
  signName: '(मनीष शर्मा)',
  signDesig: 'उप महाप्रबंधक(मा०सं०)/विभागाध्यक्ष',
  lastSync: null
};

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return null;
}

function saveToStorage(data) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(data));
  } catch (e) {}
}

function initState() {
  const seeded = localStorage.getItem('njhps_seeded');
  if (seeded !== SEED_VERSION) {
    // Fresh seed
    const state = {
      settings: { ...defaultSettings },
      trainees: SEED_TRAINEES.map(t => ({ ...t })),
      groups: SEED_GROUPS.map(g => ({ ...g })),
      orders: SEED_ORDERS.map(o => ({ ...o })),
      certs: SEED_CERTS.map(c => ({ ...c }))
    };
    saveToStorage(state);
    localStorage.setItem('njhps_seeded', SEED_VERSION);
    return state;
  }
  return loadFromStorage() || {
    settings: { ...defaultSettings },
    trainees: [], groups: [], orders: [], certs: []
  };
}

// Context
const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [state, setState] = useState(() => initState());

  const update = useCallback((updater) => {
    setState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      saveToStorage(next);
      return next;
    });
  }, []);

  const value = { state, update };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  return useContext(StoreContext);
}

// Helper hooks
export function useTrainees() {
  const { state, update } = useStore();
  return {
    trainees: state.trainees,
    addTrainee: (t) => update(s => ({ ...s, trainees: [...s.trainees, t], settings: { ...s.settings, nextCard: Math.max(s.settings.nextCard, (t.cardNo || 0) + 1) } })),
    updateTrainee: (t) => update(s => ({ ...s, trainees: s.trainees.map(x => x.id === t.id ? t : x) })),
    deleteTrainee: (id) => update(s => ({ ...s, trainees: s.trainees.filter(t => t.id !== id) })),
    nextCard: state.settings.nextCard
  };
}

export function useOrders() {
  const { state, update } = useStore();
  const unordered = state.trainees.filter(t => {
    const orderedIds = new Set(state.orders.flatMap(o => {
      const g = state.groups.find(x => x.id === o.groupId);
      return g ? g.traineeIds : [];
    }));
    return !orderedIds.has(t.id);
  });
  return {
    orders: state.orders,
    groups: state.groups,
    certs: state.certs,
    unordered,
    addOrder: (group, order) => update(s => ({
      ...s,
      groups: [...s.groups, group],
      orders: [...s.orders, order],
      settings: { ...s.settings, nextOrder: Math.max(s.settings.nextOrder, (typeof order.localOrderNo === 'number' ? order.localOrderNo : 0) + 1) }
    })),
    updateOrder: (order) => update(s => ({ ...s, orders: s.orders.map(o => o.id === order.id ? order : o) })),
    deleteOrder: (id) => update(s => ({
      ...s,
      orders: s.orders.filter(o => o.id !== id),
      certs: s.certs.filter(c => c.orderId !== id)
    })),
    saveCert: (cert) => update(s => ({
      ...s,
      certs: s.certs.find(c => c.orderId === cert.orderId)
        ? s.certs.map(c => c.orderId === cert.orderId ? { ...c, ...cert } : c)
        : [...s.certs, cert]
    })),
    getOrderForTrainee: (tid) => state.orders.find(o => {
      const g = state.groups.find(x => x.id === o.groupId);
      return g?.traineeIds?.includes(tid);
    }),
    getCert: (orderId) => state.certs.find(c => c.orderId === orderId),
    nextOrder: state.settings.nextOrder
  };
}

export function useSettings() {
  const { state, update } = useStore();
  return {
    settings: state.settings,
    updateSettings: (s) => update(prev => ({ ...prev, settings: { ...prev.settings, ...s } }))
  };
}

export function useAuth() {
  const { state } = useStore();
  const [authed, setAuthed] = useState(false);
  const login = (pwd) => {
    if (pwd === state.settings.password) { setAuthed(true); return true; }
    return false;
  };
  const logout = () => setAuthed(false);
  return { authed, login, logout };
}
