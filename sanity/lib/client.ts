import { createClient, type SanityClient } from 'next-sanity'
import { apiVersion, dataset, projectId, isSanityConfigured } from '@/sanity/env'

/**
 * Minimal stub that returns empty results when Sanity is not configured.
 * This lets the build succeed and pages render with static fallback content.
 */
const nullClient = {
  fetch: async () => null,
  config: () => ({ projectId: '', dataset: '' }),
} as unknown as SanityClient

function buildClient(useCdn: boolean, token?: string): SanityClient {
  if (!isSanityConfigured) return nullClient
  return createClient({ projectId, dataset, apiVersion, useCdn, token })
}

export const client = buildClient(true)

export const previewClient = buildClient(false, process.env.SANITY_API_TOKEN)

export function getClient(preview = false) {
  return preview ? previewClient : client
}
