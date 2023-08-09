import React, { useState, useEffect } from "react";

export default function Search({ setSearch}) {
   return (
      <input type='search' onChange={e => setSearch(e.target.value)} placeholder='search...' />
   )
}
