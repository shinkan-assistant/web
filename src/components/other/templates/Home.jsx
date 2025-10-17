'use client';

import { signInWithGoogle } from "@/helpers/auth/client";
import { useMetadata } from "@/stores/consts/metadata";
import { useRouter } from "next/navigation";

export default function HomeTemplate() {
  const router = useRouter();
  const metadata = useMetadata();

  return (
    // ページ全体のコンテナを白背景に設定
    <div className="bg-white">
      <div className="flex flex-col items-center justify-center min-h-screen container mx-auto p-4 text-center">
        
        {/* 上部コンテンツ：タイトルとキャッチコピー (アプリロゴは削除) */}
        <div className="flex flex-col items-center space-y-4 mb-12">
          
          {/* アプリケーションロゴは削除 */}
          
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900">
            {metadata.title}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {metadata.description}
          </p>
        </div>
        
        {/* 中央コンテンツ：アプリの特徴 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mx-auto mb-12">
          
          {/* 特徴１：イベント運営をサポート - SVGアイコン: カレンダーとチェック */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-left transform transition-transform duration-300 hover:-translate-y-2">
            <svg
              className="w-10 h-10 text-sky-500 mb-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
              <polyline points="9 14 12 17 15 14"></polyline> {/* チェックマーク */}
            </svg>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">イベント運営をサポート</h3>
            <ul className="text-slate-600 list-disc list-inside space-y-1">
              <li>AIによるイベント企画やお店予約</li>
              <li>参加者のアクションを通知</li>
              <li>キャンセルはシステムが自動対応</li>
              <li>QRコードによる出席確認</li>
              <li>PayPay支払い完了画面の確認</li>
            </ul>
          </div>
          
          {/* 特徴２：SNS更新をサポート - SVGアイコン: スマホとペン */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-left transform transition-transform duration-300 hover:-translate-y-2">
            <svg
              className="w-10 h-10 text-sky-500 mb-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
              <line x1="12" y1="18" x2="12.01" y2="18"></line>
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path> {/* ペン */}
            </svg>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">SNS更新をサポート</h3>
            <ul className="text-slate-600 list-disc list-inside space-y-1">
              <li>AIによる投稿の提案</li>
              <li>更新タイミングのお知らせ</li>
              <li>AIが過去の投稿を分析</li>
            </ul>
          </div>

          {/* 特徴３：問い合わせや連絡の半自動化 - SVGアイコン: 吹き出しと歯車 */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-left transform transition-transform duration-300 hover:-translate-y-2">
            <svg
              className="w-10 h-10 text-sky-500 mb-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path> {/* 吹き出し */}
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82-.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0-.33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0 .33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H12a1.65 1.65 0 0 0 1.51-1V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1.82.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V12a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2z"></path> {/* 歯車 */}
            </svg>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">問い合わせ・連絡の半自動化</h3>
            <ul className="text-slate-600 list-disc list-inside space-y-1">
              <li>AIが基本的な問い合わせに回答</li>
              <li>LINE交換不要のチャット機能</li>
              <li>AIが連絡を自動的に送信</li>
            </ul>
          </div>
        </div>

        {/* 下部コンテンツ：アクションボタン */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button 
            onClick={() => router.push('/user/register')}
            className="w-64 py-3 rounded-full bg-sky-600 text-white text-lg font-semibold shadow-lg hover:bg-sky-700 transition duration-300 transform hover:scale-105">
            新規登録して始める
          </button>
          <button 
            onClick={signInWithGoogle}
            className="w-64 py-3 rounded-full text-sky-600 text-lg font-semibold border-2 border-sky-600 hover:bg-sky-50 transition duration-300 transform hover:scale-105"
          >
            ログイン
          </button>
        </div>
      </div>
    </div>
  );
}