import React from 'react';
import {Table} from './components/table.tsx'
import {DisableTable} from './components/disable-table.tsx'

const App : React.FC = () => {
  return (
    <div>
    <Table></Table>
    <DisableTable></DisableTable>
    </div>
  );
}

export default App;
