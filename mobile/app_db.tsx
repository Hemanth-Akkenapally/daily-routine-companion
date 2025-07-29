import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as SQLite from 'expo-sqlite';          // SDK 50+ API
import 'react-native-url-polyfill/auto';

export default function App() {
  const [status, setStatus] = useState('⏳ Opening SQLite…');

  useEffect(() => {
    const db = SQLite.openDatabaseSync('routine.db');

    (async () => {
      try {
        await db.execAsync('CREATE TABLE IF NOT EXISTS probe (val INTEGER);');
        await db.execAsync('DELETE FROM probe;');
        await db.execAsync('INSERT INTO probe (val) VALUES (42);');

        const row = await db.getFirstAsync<{ val: number }>(
          'SELECT val FROM probe LIMIT 1;'
        );
        setStatus(`✅ Read value = ${row?.val ?? 'null'}`);
        console.log('SQLite row:', row?.val);   // Metro console (method 2)
      } catch (err: any) {
        setStatus('❌ ' + err.message);
        console.error('SQLite error →', err);
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 18 }}>{status}</Text>
    </View>
  );
}
