import { useState, useCallback } from 'react';
import { parcelAPI, departmentAPI } from '../services/api';

export const useParcels = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  const processParcel = useCallback(async (parcelData) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await parcelAPI.processSingle(parcelData);
      setResults(prev => [result.data, ...prev]);
      return result.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const processXML = useCallback(async (xmlData) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await parcelAPI.processXML(xmlData);
      setResults(prev => [...result.data, ...prev]);
      return result.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
  }, []);

  return {
    processParcel,
    processXML,
    results,
    loading,
    error,
    clearResults,
  };
};

export const useDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDepartments = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await departmentAPI.getAll();
      setDepartments(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createDepartment = useCallback(async (departmentData) => {
    try {
      const result = await departmentAPI.create(departmentData);
      await fetchDepartments();
      return result.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [fetchDepartments]);

  const updateDepartment = useCallback(async (id, updates) => {
    try {
      const result = await departmentAPI.update(id, updates);
      await fetchDepartments();
      return result.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [fetchDepartments]);

  const deleteDepartment = useCallback(async (id) => {
    try {
      await departmentAPI.delete(id);
      await fetchDepartments();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [fetchDepartments]);

  return {
    departments,
    loading,
    error,
    fetchDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
  };
};