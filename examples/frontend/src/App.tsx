// Copyright (c), Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react';
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import { Box, Button, Card, Container, Flex, Grid } from '@radix-ui/themes';
import { CreateAllowlist } from './CreateAllowlist';
import { Allowlist } from './Allowlist';
import WalrusUpload from './EncryptAndUpload';
import { CreateService } from './CreateSubscriptionService';
import FeedsToSubscribe from './SubscriptionView';
import { Service } from './SubscriptionService';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AllAllowlist } from './OwnedAllowlists';
import { AllServices } from './OwnedSubscriptionServices';
import Feeds from './AllowlistView';

function LandingPage() {
  return (
    <Grid columns="2" gap="4">
      <Card>
        <Flex direction="column" gap="2" align="center" style={{ height: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <h2>Airdrop Whitelist</h2>
            <p>
              Buat dan kelola whitelist pengguna untuk airdrop crypto. Hanya wallet yang termasuk
              dalam whitelist yang bisa klaim reward atau vote. Sistem ini mengenkripsi file dan hanya
              bisa diakses oleh pengguna yang terdaftar.
            </p>
          </div>
          <Link to="/allowlist-example">
            <Button size="3">Coba Sekarang</Button>
          </Link>
        </Flex>
      </Card>
      <Card>
        <Flex direction="column" gap="2" align="center" style={{ height: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <h2>Subscription / Vote NFT</h2>
            <p>
              Gunakan sistem NFT berbasis subscription untuk memberikan hak suara kepada pemegang token.
              Sistem ini hanya memberikan akses ke file/vote bagi yang memiliki NFT dan masih valid.
            </p>
          </div>
          <Link to="/subscription-example">
            <Button size="3">Lihat Contoh</Button>
          </Link>
        </Flex>
      </Card>
    </Grid>
  );
}

function App() {
  const currentAccount = useCurrentAccount();
  const [recipientAllowlist, setRecipientAllowlist] = useState<string>('');
  const [capId, setCapId] = useState<string>('');

  return (
    <Container>
      <Flex position="sticky" px="4" py="2" justify="between">
        <h1 className="text-4xl font-bold m-4 mb-8">Airdrop Crypto Vote</h1>
        <Box>
          <ConnectButton />
        </Box>
      </Flex>
      <Card style={{ marginBottom: '2rem' }}>
        <p>
          1. Source code dapat ditemukan di{' '}
          <a href="https://github.com/MystenLabs/seal/tree/main/examples">GitHub</a>.
        </p>
        <p>
          2. Aplikasi ini berjalan di Testnet. Pastikan wallet kamu terhubung ke Testnet dan punya saldo
          dari <a href="https://faucet.sui.io/">faucet.sui.io</a>.
        </p>
        <p>
          3. File yang diupload akan tersedia hanya 1 epoch di Walrus Testnet secara default.
        </p>
        <p>
          4. Saat ini hanya mendukung file gambar. UI masih basic, hanya untuk keperluan demo.
        </p>
      </Card>
      {currentAccount ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/allowlist-example/*"
              element={
                <Routes>
                  <Route path="/" element={<CreateAllowlist />} />
                  <Route
                    path="/admin/allowlist/:id"
                    element={
                      <div>
                        <Allowlist
                          setRecipientAllowlist={setRecipientAllowlist}
                          setCapId={setCapId}
                        />
                        <WalrusUpload
                          policyObject={recipientAllowlist}
                          cap_id={capId}
                          moduleName="allowlist"
                        />
                      </div>
                    }
                  />
                  <Route path="/admin/allowlists" element={<AllAllowlist />} />
                  <Route
                    path="/view/allowlist/:id"
                    element={<Feeds suiAddress={currentAccount.address} />}
                  />
                </Routes>
              }
            />
            <Route
              path="/subscription-example/*"
              element={
                <Routes>
                  <Route path="/" element={<CreateService />} />
                  <Route
                    path="/admin/service/:id"
                    element={
                      <div>
                        <Service
                          setRecipientAllowlist={setRecipientAllowlist}
                          setCapId={setCapId}
                        />
                        <WalrusUpload
                          policyObject={recipientAllowlist}
                          cap_id={capId}
                          moduleName="subscription"
                        />
                      </div>
                    }
                  />
                  <Route path="/admin/services" element={<AllServices />} />
                  <Route
                    path="/view/service/:id"
                    element={<FeedsToSubscribe suiAddress={currentAccount.address} />}
                  />
                </Routes>
              }
            />
          </Routes>
        </BrowserRouter>
      ) : (
        <p>Silakan sambungkan wallet Anda untuk melanjutkan</p>
      )}
    </Container>
  );
}

export default App;
